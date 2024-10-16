import { exit } from 'process'
import { AddIsAdminToPeople } from './addIsAdminToPeople'
import { AddMinorToneToMusics } from './addMinorToneToMusics'
import { ChangeValueOfMusicsTone } from './changeValueOfMusicsTone'
import { InitialMigrations } from './initialMigrations'

console.log('Running migrations up...')
try {
  await InitialMigrations.up()
  await AddIsAdminToPeople.up()
  await AddMinorToneToMusics.up()
  await ChangeValueOfMusicsTone.up()
} catch (error) {
  console.error('Migration failed:', error)
  exit(1)
}
console.log('Done!')
exit(0)
