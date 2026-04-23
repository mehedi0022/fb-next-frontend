'use client';

import React from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useLogoutMutation } from '@/appstore/api/authApi';
import { useAppDispatch, useAppSelector } from '@/appstore/hooks/hooks';
import { clearSession, selectIsAuthenticated, selectUser } from '@/appstore/slices/sessionSlice';
import { baseApi } from '@/appstore/api/baseApi';

type Props = {
  open: boolean;
  onClose: () => void;
};

const Profile = ({ open, onClose }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const user = useAppSelector(selectUser);
  const auth = useAppSelector(selectIsAuthenticated);

  const handleLogout = async () => {
    try {
      // Call logout API
      await logout().unwrap();

      // Clear Redux state first
      dispatch(clearSession());
      dispatch(baseApi.util.resetApiState());
      
      // // Force clear cookies from browser (fallback)
      // document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      // document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      
    } catch (error) {
      console.error('Logout failed:', error);
      
      // Even if API fails, clear local state and cookies
      dispatch(clearSession());
      dispatch(baseApi.util.resetApiState());
      // document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      // document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    } finally {
      onClose();
      router.replace('/');
    }
  };

  if (!open) return null;

  return (
    <div className="w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">

      {/* User Info */}
      <div className="px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <UserOutlined className="text-white text-base" />
          </div>
          {auth && (
            <div className="overflow-hidden">
              <p className="text-white font-semibold text-sm truncate">
                {user?.name ?? user?.email}
              </p>
              <p className="text-blue-100 text-xs truncate capitalize">
                {user?.role?.replace('_', ' ')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-1">
        <button
          onClick={() => { router.push('/settings'); onClose(); }}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <SettingOutlined className="text-gray-400" />
          <span>Settings</span>
        </button>

        <div className="mx-3 border-t border-gray-100 my-1" />

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogoutOutlined />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;