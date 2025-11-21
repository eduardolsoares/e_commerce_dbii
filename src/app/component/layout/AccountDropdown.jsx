import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { SignOutButton } from '../auth'
export default function AccountDropdown() {
  return (
    <Menu as="div" className="relative inline-block">
      <MenuButton className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#AEB5C0" class="size-6 hover:stroke-gray-600" >
                      <path strokeLinecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
      </MenuButton>

      <MenuItems
        transition
        className="
    absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-gray-100 shadow-lg transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in outline-none focus:outline-none focus:ring-0 focus:ring-offset-0
  "
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
            >
              <SignOutButton></SignOutButton> 
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}
