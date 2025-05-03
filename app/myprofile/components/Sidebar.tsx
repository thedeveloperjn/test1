"use client";
import { useRouter } from 'next/navigation';
import { UserCircle ,Confetti ,Info ,Certificate ,Lifebuoy ,ChatDots,SignOut    } from "@phosphor-icons/react/dist/ssr";
interface SidebarProps {
  userName: string;
  userTitle: string;
  userId: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}


// ... (previous imports and interface remain the same)

const Sidebar: React.FC<SidebarProps> = ({ userName, userTitle, userId, activeTab, setActiveTab }) => {
  const router = useRouter();

  const getInitials = (name: string) => {
    const nameParts = name.split(' ');
    const initials = nameParts.map((part) => part.charAt(0)).join('').toUpperCase();
    return initials.slice(0, 2);
  };

  const menuItems = [
    { icon: <UserCircle size={20}/>, label: 'My Profile', tab: 'Profile' },
    { icon: <Confetti size={20}/>, label: 'Birthdays', tab: 'Birthdays' },
    { icon: <Info size={20}/>, label: 'Profile Inquiries', tab: 'Profile Inquiries' },
    { icon: <Certificate size={20}/>, label: 'Certificates', tab: 'Certificates' },
  ];

  const bottomMenuItems = [
    { icon: <Lifebuoy size={20}/>, label: 'Help & Support', tab: 'Help & Support' },
    { icon: <ChatDots size={20}/>, label: 'Feedback & Suggestions', tab: 'Feedback & Suggestions' },
    { icon: <SignOut  size={20}/>, label: 'Logout', path: '/logout' },
  ];

  return (
    <div className="w-[300px] !sticky !items-start !top-[10px] text-white bg-[#f5f5f5]/5 p-4 rounded-[12px] h-[84vh] flex flex-col">
      {/* User Info Section */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">
          {getInitials(userName)}
        </div>
        <div>
          <p className="text-sm">{userName}</p>
          <p className="text-xs text-gray-400">{userTitle}</p>
          <p className="text-xs text-gray-500">{userId}</p>
        </div>
      </div>

      {/* Main Menu Items (including tabs) */}
      <div className="h-full w-full flex flex-col justify-between">
        <nav className="flex flex-col w-full">
          {menuItems.map((item) => {
            const isActive = item.tab === activeTab || (item.label === 'My Profile' && activeTab === 'Profile');
            return (
              <div
                key={item.label}
                className={`w-full flex items-center gap-3 p-2 rounded-lg cursor-pointer mb-2 ${
                  isActive ? 'bg-[#f5f5f5]/10' : 'hover:bg-[#f5f5f5]/7'
                }`}
                onClick={() => setActiveTab(item.tab)}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            );
          })}
        </nav>

        {/* Separator */}
        <hr className="border-[#f5f5f5]/15 my-4" />

        {/* Bottom Menu Items */}
        <nav className="flex flex-col w-full">
          {bottomMenuItems.map((item) => {
            const isActive = item.tab ? item.tab === activeTab : router.pathname === item.path;
            return (
              <div
                key={item.label}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer mb-2 ${
                  isActive ? 'bg-[#f5f5f5]/10' : 'hover:bg-[#f5f5f5]/7'
                }`}
                onClick={() => (item.tab ? setActiveTab(item.tab) : router.push(item.path))}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;