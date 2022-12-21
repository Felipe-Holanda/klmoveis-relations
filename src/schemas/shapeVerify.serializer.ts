import { AppError } from "../errors";
import { Request, Response, NextFunction } from 'express'

export default function shapeVerify(schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = { uuid: req.params.id, ...req.body }
            const { error } = schema.validate(data)
            if (error) throw new AppError(error.message, 400)
            return next()
        } catch (err) {
            return res.status(err.status || 400).json({ message: err.message })
        }
    }
}