import request from "@/lib/request"

interface UserInfo {
    user_id: string
    code1: string
    code2: string
    role_id: number //用户在系统中的角色或权限级别
    password: string
    expiration_date: number
    status: string
    registered_ts: string //用户注册的时间戳(timestamp)
    registered_username: string
    modified_ts: string //用户信息最后一次修改的时间戳
    modified_username: string
}

interface ReqParam {
    code1: string
    code2: string
    data: UserInfo
}

interface ResBody {
    code: number
    msg: string
}

export const chaUser = async (params: ReqParam) => {
    const res = (await request.post("/changeuserinfo",params)) as ResBody
    return res
}