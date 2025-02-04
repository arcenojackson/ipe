import { exit } from 'process'
import { AddCategoryToMusics } from './addCategoryToMusics'
import { AddIsAdminToPeople } from './addIsAdminToPeople'
import { AddMinorToneToMusics } from './addMinorToneToMusics'
import { ChangeValueOfMusicsTone } from './changeValueOfMusicsTone'
import { CreateCategories } from './createCategories'
import { InitialMigrations } from './initialMigrations'

console.log('Running migrations up...')
try {
  await InitialMigrations.up()
  await AddIsAdminToPeople.up()
  await AddMinorToneToMusics.up()
  await ChangeValueOfMusicsTone.up()
  await AddCategoryToMusics.up()
  await CreateCategories.up()
} catch (error) {
  console.error('Migration failed:', error)
  exit(1)
}
console.log('Done!')
exit(0)
