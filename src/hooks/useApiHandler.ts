import { useState, useCallback } from "react";
import { toast } from "react-toastify";

export function useApiHandler() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleApi = useCallback(
    async <T = any>(
      apiFunc: () => Promise<T>,
      options?: {
        showSuccessToast?: boolean;
        showErrorToast?: boolean;
        onSuccess?: (res: T) => void;
        onError?: (error: any) => void;
      }
    ): Promise<T | null> => {
      try {
        setLoading(true);
        setErrorMsg(null);

        const res = await apiFunc();

        //  Success Toast
        if (options?.showSuccessToast && (res as any)?.message) {
          toast.success((res as any).message);
        }

        //  Success callback
        options?.onSuccess?.(res);

        return res;
      } catch (err: any) {
        const msg = err?.errorMsg || err?.message || "Something went wrong";

        setErrorMsg(msg);

        //  Error Toast
        if (options?.showErrorToast) {
          toast.error(msg);
        }

        //  Error callback
        options?.onError?.(err);

        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    handleApi,
    loading,
    errorMsg,
  };
}
