import { Outlet } from 'react-router-dom'

import { UserSideNav } from 'src/pages/User/components'

export default function UserLayout() {
  return (
    <div>
      <UserSideNav />
      <Outlet />
    </div>
  )
}
