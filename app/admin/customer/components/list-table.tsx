"use client"

import { useAuthContext } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { CustomerInfo, getCustomerList } from "@/actions/get-customer-list"
import Link from "next/link"
import { CustomerArray } from "@/mock/data"

export const CustomerTable = () => {

    const { user } = useAuthContext()
    const router = useRouter()
    const [data, setData] = useState<CustomerInfo[]>([])

    // const requestData = useCallback(async () => {
    //     if (!user) return
    //     const { user_id, role_type } = user
    //     const data = await getCustomerList({ user_id, role_type })
    //     data?.customerInfo && setData(data.customerInfo)
    // }, [user]
    // )

    // useEffect(() => {
    //     requestData()
    // }, [requestData])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const CustomerArray = await getCustomerList();
                setData(CustomerArray);
            } catch (error) {
                // 处理错误
            }
        };

        fetchData();
    }, [])

    const goDetail = useCallback(
        (item: CustomerInfo) => () => {
            router.push(`/admin/customer/${item.code1}`)
        }, [router] // 依赖项
    )

    return (
        <Table className="border">
            <TableHeader>
                <TableRow>
                    <TableHead className="">顧客ID</TableHead>
                    <TableHead className="">NAME</TableHead>
                    <TableHead className="">KANA NAME</TableHead>
                    <TableHead className="">SHORT NAME</TableHead>
                    <TableHead className="">USER ID</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <Link type="link" href={`/admin/customer/${item.code1}-${item.code2}`}>{`${item.code1}-${item.code2}`}</Link>
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.kana_name}</TableCell>
                        <TableCell>{item.short_name}</TableCell>
                        <TableCell>{item.user_id}</TableCell>
                        <TableCell>
                            <Button size="sm" variant="destructive" className="" onClick={goDetail(item)}>变更</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )

}
