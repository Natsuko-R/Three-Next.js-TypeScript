"use client"

import { Box } from "@/components/custom-ui/box"
import { useEffect, useMemo } from "react"
import { UserExistsForm } from "./user-form/user-exists-form"
import { UserForm } from "./user-form/user-form"
import { getCustomerInfo } from "@/actions/get-customer-info"
import { CustomerForm } from "./customer-form/customer-form"

interface CustomerClientProps {
    customerId: string
}

export const CustomerClient: React.FC<CustomerClientProps> = ({ customerId }) => {

    // 如果等于，就返回true，否则返回false
    const isNew = useMemo(() => customerId === "1", [customerId]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                // const resData = await getCustomerInfo(parseInt(customerId))
                // console.log(resData);
            } catch (error) {
                console.error(error)
            }
        };

        fetchData();

    }, [customerId])

    return (
        <Box className="p-0 w-full flex-col gap-4">
            <CustomerForm title="顧客情報登録" isNew={isNew} />
            {
                isNew ? <UserExistsForm title="user edit" /> : <UserForm />
            }
        </Box>
    )
}



// 使用了两个逻辑非运算符!!，目的是将一个值转换为其对应的布尔值
// 如果user_id存在（不是null或undefined），那么!!customerDetail?.user_id将返回true，否则返回false
// const isUserSet = useMemo(() => !!customerDetail?.user_id, [customerDetail?.user_id])
