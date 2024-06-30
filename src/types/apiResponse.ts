import { Message } from "@/model/Message.models";

export interface ApiResponse{
    success: boolean;
    message: string;
    isAcceptingMessages?: boolean
    messages?: Array<Message>
}