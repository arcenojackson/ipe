import { exit } from 'process'
import { AddIsAdminToPeople } from './addIsAdminToPeople'
import { AddMinorToneToMusics } from './addMinorToneToMusics'
import { ChangeValueOfMusicsTone } from './changeValueOfMusicsTone'

console.log('Running migrations down...')
await AddIsAdminToPeople.down()
await AddMinorToneToMusics.down()
await ChangeValueOfMusicsTone.down()
console.log('Done!')
exit(0)
