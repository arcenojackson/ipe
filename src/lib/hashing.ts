import { hashSync, genSaltSync, compareSync } from 'bcrypt'

const SALT = 8

export const generatePasswordHash = (password: string) => hashSync(password, genSaltSync(SALT))

export const comparePassword = (hash: string, password: string) => compareSync(password, hash)
