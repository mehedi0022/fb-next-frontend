'use client';

import React from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = {
  open: boolean;
};

const testData = {
  name: 'Peyal Hasan',
  url: 'https://avatars.githubusercontent.com/u/155246181?v=4'
};
const auth = true;

const Profile = ({ open }: Props) => {
  const router = useRouter();

  // Logout handler 
  const handleLogout = () => {
    // Remove access token 
    localStorage.removeItem('accessToken');
    
    // Redirect to login page
    router.push('/auth/login');
  };

  
  const items: MenuProps['items'] = [
    {
      key: 'profile-header',
      label: (
        <div className="p-2 flex items-center gap-3 border-b bg-gray-50 -m-1 mb-1 rounded-t-md">
          {auth ? (
            <Image
              className="rounded-full border-2 border-secondary"
              src={testData.url}
              width={40}
              height={40}
              alt={testData.name}
            />
          ) : (
            <UserOutlined className="text-2xl text-gray-400" />
          )}

          {auth && (
            <div>
              <p className="font-semibold leading-tight text-black">{testData.name}</p>
              <p className="text-xs text-gray-500">User</p>
            </div>
          )}
        </div>
      ),
      disabled: true,
    },
    {
      key: '2',
      label: 'Settings',
      icon: <SettingOutlined />,
    },
    { type: 'divider' },
    {
      key: '3',
      label: 'Logout',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout, 
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      open={open}
      trigger={['click']}
      placement="bottomRight"
      overlayClassName="min-w-[200px]"
    >
     
    </Dropdown>
  );
};

export default Profile;