import axios from "axios"
import { toast } from "react-hot-toast"

axios.interceptors.request.use(
    function (config) {
        config.baseURL = process.env.NEXT_PUBLIC_API_URL
        const authStr = localStorage.getItem("auth")
        if (authStr) {
            const authData = JSON.parse(authStr)
            const { access_token, user } = authData.state

            if (access_token && user) {
                const { code1, code2, user_id } = user
                config.headers.Authorization = `Bearer ${access_token}`
                if (config.headers["Content-Type"]) {
                    config.headers["Content-Type"] = "application/json"
                }
                config.data = {
                    ...config.data,
                    code1,
                    code2,
                    user_id
                }

            }
        }

        return config
    },
    function (error) {
        console.log("req-error : " + error)
        return Promise.reject(error)
    })

axios.interceptors.response.use(

    function (response) {
        return response.data
    },
    
    function (error) {
        console.log("res-error : " + error)

        // 这段代码的每一个数字的错误信息指代什么？这里return的this是指什么
        error.globalErrorProcess = function () {
            switch (error?.response?.status) {
                case 400:
                    console.error(error)
                    toast.error(error?.response?.data?.msg)
                    break
                case 401:
                    console.error(error)
                    break
                case 403:
                    break
                case 404:
                    break
            }
            return Promise.reject(this)
        }

        //  不是 || 而是 && 
        if (error.config.hasOwnProperty("catch") && error.config.catch == true) {
            return Promise.reject(error)
        }

        return error.globalErrorProcess()
    }

)

export default axios