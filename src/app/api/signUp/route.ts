import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import MessageModel from "@/model/Message.models";
import UserModel from "@/model/User.models";
import bycrypt from "bcryptjs";


export async function POST(request: Request){
    await dbConnect()

    try {
        const {username, email, password} = await request.json()
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })

        if (existingUserVerifiedByUsername) {
            return Response.json({
                    success: false,
                    message: "Username is already taken"

                },{status: 400}
            )
        }

        const existingUserByEmail =  await UserModel.findOne({
            email
        })

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json({
                    success: false,
                    message: "User Already Exists With This Email"
                }, {status: 400})
            } else {
                const hashedPassword = await bycrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
            }

        }else{
            const hashedPassword = await bycrypt.hash(password, 10); 
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new UserModel({
                username,
                email,
                hashedPassword,
                verifyCode,
                verifyCodeExp: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })

            await newUser.save()
        }

        // Send Verification Email

        const emailResponse = await sendVerificationEmail(email, username, verifyCode)

        if (!emailResponse.success){
            return Response.json({
                success: false,
                message: emailResponse.message
            }, {status: 500})
        }

        return Response.json({
            success: true,
            message: "User Registered Successfully, Please Verify Your Email"
        }, {status: 201})

    } catch (error) {
        console.error('Error Registering User')
        return Response.json(
            {
            success: false,
            message: "Error Registering User"
            },
            {
                status: 500
            }
        )
    }
}