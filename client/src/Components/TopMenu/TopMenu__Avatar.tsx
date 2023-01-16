import { Avatar, Dropdown, Navbar } from "flowbite-react";

import { HomeIcon } from '@heroicons/react/24/solid'
export default function TopMenu__Aavatar(){
    return (
        <div className="flex md:order-2">
            <Dropdown
            arrowIcon={false}
            inline={true}
            label={<span>User</span>}
            >
            <Dropdown.Header>
                <span className="block text-sm">
                Bonnie Green
                </span>
                <span className="block truncate text-sm font-medium">
                name@flowbite.com
                </span>
            </Dropdown.Header>
            <Dropdown.Item>
                Dashboard
            </Dropdown.Item>
            <Dropdown.Item>
                Settings
            </Dropdown.Item>
            <Dropdown.Item>
                Earnings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
                Sign out
            </Dropdown.Item>
            </Dropdown>
        </div>
    )
}