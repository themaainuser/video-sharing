import { upload } from "@imagekit/next";
import { apiClient } from "./api-client";
import { toast } from "sonner";

type InputProp = {
    acceptedFiles: File[];
    customName: string;
    onProgress: (progress: number) => void;
}

export const uploadFiles = async ({ acceptedFiles, customName, onProgress }: InputProp) => {
    try {
        const authRes = await fetch("/api/auth/imagekit-auth", {
            method: "GET",
        });
        const auth = await authRes.json();
        const { token, expire, signature } = auth.authenticationParameters;

        const uploadFiles = acceptedFiles[0]; // taking only 1 File form acceptedFiles
        const extension = uploadFiles.name.split(".").pop();

        const finalName = (customName.trim() || "untitled") + "." + extension;

        // Call the ImageKit upload function with all required parameters
        const res = await upload({
            file: uploadFiles,
            fileName: finalName,
            signature,
            expire,
            token,
            publicKey: auth.publicKey!,
            onProgress: (event) => {
                if (event.lengthComputable && onProgress) {
                    const progressValue = Math.round(
                        (event.loaded / event.total) * 100,
                    );
                    onProgress(progressValue);
                    if (progressValue === 100) {
                        toast.success("Video Uploaded successfully");
                    }
                }
            },
        });
        await apiClient.createVideos({
            title: finalName,
            videoUrl: res.url!,
            thumbnailUrl: "not generated", // Optional: add this if you generate thumbnails
            description: "no description", // Optional: add UI for this later
            controls: true,
            transformation: {
                height: 1080,
                width: 1920,
                quality: 100,
            },
        });
        toast.success("File uploaded successfully");
        return res.url;
    } catch (error) {
        console.log(error);
        toast.error("upload failed");
    }
}
