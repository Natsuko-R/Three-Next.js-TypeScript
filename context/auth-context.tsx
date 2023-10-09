"use client"

import { Children, createContext, useContext } from 'react';
import { StateCreator, create } from 'zustand';
import { PersistOptions, persist } from 'zustand/middleware';

import request from "@/lib/request"


interface IUser {
    code1: string
    code2: string
    controller_type: number
    role_type: number
    token?: string
    user_id: string
}

interface AuthStore {
    isAuthenticated: boolean
    deviceType: string
    access_token: string
    user: IUser | null

    signIn: (
        username: string,
        password: string,
        callback?: (type: string) => void // type指deviceType，指data?.controller_type?.toString()
    ) => void

    signOut: (
        callback?: () => void
    ) => void
}

type Persist = (
    config: StateCreator<AuthStore>,
    options: PersistOptions<AuthStore>
) => StateCreator<AuthStore>

const userAuth = create<AuthStore>(
    (persist as Persist)(
        (set) => ({
            isAuthenticated: false,
            deviceType: "",
            access_token: "",
            user: null,

            signIn: async (username, password, callback) => {
                const { data }: { data: IUser } = await request.post("/login", {
                    user_id: username,
                    password
                })

                const { token, ...user } = data // ? ...user 为什么是展开user

                set({
                    isAuthenticated: true,
                    deviceType: data?.controller_type?.toString(),
                    access_token: token,
                    user
                })

                callback && callback(data?.controller_type?.toString())
            },

            signOut: () => {
                set({
                    isAuthenticated: false,
                    deviceType: undefined, // ?
                    access_token: "", // ?
                    user: null
                })
            }
        }),
        {
            name: "auth"
        }
    )
)

const AuthContext = createContext<AuthStore>({
    isAuthenticated: false,
    deviceType: "",
    access_token: "",
    user: null,
    signIn: () => { },
    signOut: () => { }
})

export const AuthProvider = ({ Children }: { Children: React.ReactNode }) => {
    const value = userAuth()

    return (
        <AuthContext.Provider value={value}>{Children}</AuthContext.Provider>
    )
}

export const AuthConsumer = AuthContext.Consumer

export const useAuthContext = () => useContext(AuthContext)