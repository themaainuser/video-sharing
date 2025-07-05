import mongoose, { model, models, Schema } from 'mongoose';
import bcrypt from "bcrypt";

export const Video_Dimensions = {
    height: 1080,
    weight: 1920
} as const

export interface Video {
    _id?: mongoose.Types.ObjectId,
    title: string,
    description: string,
    videoUrl: string,
    thumbnailUrl: string,
    constrols?: boolean,
    transformation?:{
        height: number;
        width: number;
        fps?: number
        quality?: number;
    },
    duration?: number;
    size?: number;
}

const videoSchema = new Schema<Video>(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        videoUrl: {type: String, required: true},
        thumbnailUrl: {type: String, required: true},
        constrols: {type: Boolean, default: true},
        transformation:{
            height: {type: Number,default: Video_Dimensions.height},
            width: {type: Number, default: Video_Dimensions.weight},
            fps: {type: Number, required: true},
            quality: {type: Number, min:1, max: 100 },
        }
    },
    {
        timestamps: true,
    }
)

const Video = models?.Video || model("Video", videoSchema);

export default Video;
