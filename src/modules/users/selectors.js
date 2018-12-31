import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createBaseSelector } from 'modules/utils'

const getUsers = createBaseSelector(['users'])

export const list = getUsers(['list'])
export const fetchStatus = getUsers(['fetchStatus'])
export const listWithoutUserID = (userID) => createSelector([list], R.filter(
  R.complement(R.propEq)('userAccount', userID)
))
