import { useMutation } from "@tanstack/react-query";
import { useLanguage } from "@/store";
import { API_URL } from "./api";
import { useAuthStore } from "@/store/useAuthStore";

export const usePostMutation = ({
    endpoint,
    onSuccess,
    onError,
    enabledToast = true,
}: {
    endpoint: string;
    onSuccess?: (data: any) => void;
    onError?: (err: any) => void;
    enabledToast?: boolean;
}) => {
    const { language } = useLanguage();
    const { authData } = useAuthStore()
    return useMutation({
        mutationFn: async (formData: FormData) => {
            const res = await fetch(`${API_URL}${endpoint}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "accept-language": language,
                    authorization: `jawJQ${authData?.token}`,
                },
                body: formData,
            });


            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || "Something went wrong");
            }

            return res.json();
        },
        onSuccess,
        onError,
    });
};
