import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, ChefHat } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Recipe Finder:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    try {
      window.location.reload();
    } catch {
      // fallback
    }
  };

  private handleClearData = () => {
    try {
      window.localStorage.removeItem('recipe_ingredient_query');
      window.localStorage.removeItem('saved_recipes_collection');
      window.location.reload();
    } catch {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4 text-[#3A3530]">
          <div className="max-w-md w-full bg-white border border-[#E8E2D9] rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-[#5A7D5B]/10 text-[#5A7D5B] flex items-center justify-center mx-auto">
              <ChefHat className="w-8 h-8 text-[#5A7D5B]" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-medium border border-amber-200">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Application Recovery</span>
              </div>
              <h1 className="font-serif text-2xl text-[#3A3530]">Something unexpected happened</h1>
              <p className="text-sm text-[#3A3530]/70">
                Recipe Finder encountered an unexpected rendering error. Your saved data is safe.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-[#F5F2EE] rounded-xl text-left border border-[#E8E2D9] text-xs font-mono text-[#3A3530]/80 overflow-x-auto max-h-24">
                {this.state.error.message || 'Unknown error'}
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={this.handleReset}
                className="flex-1 py-3 px-4 bg-[#5A7D5B] hover:bg-[#486549] active:scale-[0.99] text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload App</span>
              </button>

              <button
                type="button"
                onClick={this.handleClearData}
                className="py-3 px-4 bg-[#F5F2EE] hover:bg-[#ECE6DE] text-[#3A3530] rounded-xl text-sm font-medium border border-[#E8E2D9] transition-all cursor-pointer"
              >
                <span>Reset Storage</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
