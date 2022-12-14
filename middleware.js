import * as jose from 'jose'

/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @param {next} next 
 * verifies token in "token" section of JSON body
 * modifies req to contain req.username of token owner
 */
const verifyJWT = async (req, res, next) => {
    const { token } = req.body

    if (!token) {
        next({
            status:401,
            message:"missing token in JSON body"
        })
    }

    const secret = new TextEncoder().encode(
        `${process.env.JWT_SECRET}`
    );

    try {
        const { payload, protectedHeader } = await jose.jwtVerify(token, secret, {
            issuer: 'backend.reliquary.moodyrahman.com',
            audience: 'reliquary.moodyrahman.com',
            subject:"access"
        })
        req.username = payload.username
        next()

    } catch (error) {
        next({message:"bad token", status:401})
    }
}


const verifyJSONBody = (body) => {
    return (req, res, next) => {
        body.forEach(element => {
            if (!req.body.hasOwnProperty(element)) {
                return next({
                    status:400,
                    message:`bad body, missing ${element}`
                })
            }
        });
        return next()
    }
}

export { verifyJWT, verifyJSONBody }
