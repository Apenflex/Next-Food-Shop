import prisma from '@/prisma/client'

async function main() {
    const defaultUsers = ['Bob', 'Jackie', 'Alice']

    defaultUsers.map(async (name) => {
        await prisma.user.upsert({
            where: { email: `${name}@example.com` },
            update: {},
            create: {
                email: `${name}@example.com`,
                name: name,
                password: 'password',
            },
        })
        console.log(`User ${name} created successfully \n email:${name}@example.com \n password: password`)
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
