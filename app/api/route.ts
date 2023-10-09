// for test

export async function GET() {
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1)
        }, 3000)
    })
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/ditto", {
        headers: {
            "Content-Type": "application/json",
        },
    })
    return res
}

