
export async function getDevicesInfo() {
    const res = await fetch("http://localhost:1337/api/devices")
    const data = await res.json()
    return data
}

export async function addNewDevice(newDeviceData: any) {
    const response = await fetch("http://localhost:1337/api/devices", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newDeviceData),
    });

    return response;
}

