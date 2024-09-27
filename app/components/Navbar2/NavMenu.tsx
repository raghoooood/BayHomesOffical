import { useState, useEffect, useRef } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { getAreaNames } from '@/lib/actions/area.action';
import { getProjectNames } from '@/lib/actions/project.action';

import menuItemsData from '@/utils';

interface NavMenuProps {
  onMenuClick?: () => void;
}

const NavMenu: React.FC<NavMenuProps> = ({ onMenuClick }) => {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState(menuItemsData);  // Initially use static menu items
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleNavigation = (
    path: string,
    filters?: { [key: string]: string },
    optionName?: string
  ) => {
    try {
      let url = path;
      if (filters) {
        const queryParams = new URLSearchParams(filters);
        queryParams.append('source', 'nav');
        url = optionName
          ? `${path}?${queryParams}&name=${encodeURIComponent(optionName)}`
          : `${path}?${queryParams}`;
      }

      router.push(url);
      setOpenMenu(null);

      if (window.innerWidth < 1024 && onMenuClick) {
        onMenuClick();
      }
    } catch (error) {
      console.error('Error during navigation:', error);
    }
  };

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const { areas } = await getAreaNames();  // Fetch area names from the backend
        const { projects } = await getProjectNames();
        const areaOptions = areas.map((area: { areaName: string }) => ({
          name: area.areaName,
          path: `/areas/${encodeURIComponent(area.areaName)}`
        }));
        const projectOptions = projects.map((project: { projectName: string }) => ({
          name: project.projectName,
          path: `/projects/${encodeURIComponent(project.projectName)}`
        }));

        // Find the index to insert the "Areas" section after "Projects"
        const rentsIndex = menuItemsData.findIndex(item => item.title === "Rent");

        // Prepare the new menu items with the "Areas" section added
        const updatedMenuItems = [
          
          ...menuItemsData.slice(0, rentsIndex + 1),  // Include all items before "Projects"
          {
            title: "Projects",
            path: "/projects",
            options: [...projectOptions],
          },
          {
            title: "Areas",
            path: "/areas",
            options: [{ name: "See All Areas", path: "/areas" }, ...areaOptions],
          },
          ...menuItemsData.slice(rentsIndex + 1)  // Include all items after "Projects"

          
        ];

        setMenuItems(updatedMenuItems);
      } catch (error) {
        console.error('Error fetching area names:', error);
      }
    };

    fetchAreas();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative nav-menu">
      <div className={`flex flex-col sm:flex-row sm:items-center gap-4}`}>
        {menuItems.map((item: any, index: any) => (
          <div key={index} className="group cursor-pointer relative">
            <div
              className="flex items-center px-4 py-2 hover:text-orange-500 group-hover:underline"
              onClick={() => {
                if (!item.options) {
                  handleNavigation(item.path);
                } else {
                  toggleMenu(item.title.toLowerCase());
                }
              }}
              role="button"
              aria-expanded={openMenu === item.title.toLowerCase()}
              aria-controls={`menu-${index}`}
            >
              <div className="sm:hidden mr-2">
                {openMenu === item.title.toLowerCase() ? <AiOutlineMinus /> : <AiOutlinePlus />}
              </div>
              {item.title}
            </div>
            {item.options && openMenu === item.title.toLowerCase() && (
              <div
                id={`menu-${index}`}
                className="flex flex-col w-[260px] sm:absolute bg-white sm:bg-white w-cover sm:shadow-md dark:bg-bgDark text-black dark:text-white rounded-md w-48 md:w-64 sm:text-sm sm:mt-2 sm:space-y-2 sm:py-2 sm:rounded-md"
              >
                {item.options.map((option: any, optionIndex: any) => (
                  <a
                    key={optionIndex}
                    className="flex sm:ml-4 ml-10 w-full py-2 rounded-md text-sm text-gray-500 hover:text-orange-500 transition-colors duration-300"
                    onClick={() => handleNavigation(option.path, option.filters, option.name)}
                  >
                    {option.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavMenu;
