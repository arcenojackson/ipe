import { exit } from 'process'
import { AddIsAdminToPeople } from './addIsAdminToPeople'
import { InitialMigrations } from './initialMigrations'

console.log('Running migrations up...')
try {
  await InitialMigrations.up()
  await AddIsAdminToPeople.up()
} catch (error) {
  console.error('Migration failed:', error)
  exit(1)
}
console.log('Done!')
exit(0)
