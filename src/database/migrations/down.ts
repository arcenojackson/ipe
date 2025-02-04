import { exit } from 'process'
import { AddCategoryToMusics } from './addCategoryToMusics'
import { AddIsAdminToPeople } from './addIsAdminToPeople'
import { AddMinorToneToMusics } from './addMinorToneToMusics'
import { ChangeValueOfMusicsTone } from './changeValueOfMusicsTone'
import { CreateCategories } from './createCategories'

console.log('Running migrations down...')
try {
  await AddIsAdminToPeople.down()
  await AddMinorToneToMusics.down()
  await ChangeValueOfMusicsTone.down()
  await AddCategoryToMusics.down()
  await CreateCategories.down()
} catch (error) {
  console.error('Migration failed:', error)
  exit(1)
}
console.log('Done!')
exit(0)
