import { exit } from 'process'
import { AddIsAdminToPeople } from './addIsAdminToPeople'

console.log('Running migrations down...')
await AddIsAdminToPeople.down()
console.log('Done!')
exit(0)
