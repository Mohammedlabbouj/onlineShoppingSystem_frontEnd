import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, Menu, FileText } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import TopicDropdown from "./TopicDropdown";

interface NavigationBarProps {
  onMenuClick?: () => void;
  onTopicSelect?: (topic: string) => void;
  onLogoClick?: () => void;
  onLegislationClick?: () => void;
}

const navLinks = ["About", "Resources", "Legislation Tracker", "Take Action"];
const links = ["Your profile", "Settings", "Logout"];

const NavigationBar = ({
  onMenuClick = () => console.log("Menu clicked"),
  onTopicSelect = (topic: string) => console.log(`Selected topic: ${topic}`),
  onLogoClick = () => console.log("Logo clicked"),
  onLegislationClick = () => console.log("Legislation tracker clicked"),
}: NavigationBarProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <div className="bg-gray-800 px-2 md:px-5 xl:px-10 2xl:px-20 py-3 mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <Link to="/" onClick={onLogoClick}>
                <div className="text-xl font-bold text-white">
                  Systemic Change
                </div>
              </Link>

              <nav className="hidden lg:block flex items-center space-x-2 lg:space-x-5">
                <TopicDropdown onTopicSelect={onTopicSelect} />
              </nav>
            </div>

            <div className="lg:hidden w-[270px] sm:w-[410px] md:w-[550px]">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search topics"
                    className="pl-8 bg-gray-700 outline-none border-none focus-visible:ring-none"
                  />
                </div>
              </form>
            </div>

            <div className="hidden lg:block">
              <div className="flex items-center space-x-5">
                <div className="">
                  <form>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search topics"
                        className="pl-8 bg-gray-700 outline-none border-none focus-visible:ring-none"
                      />
                    </div>
                  </form>
                </div>
                <Button
                  variant="ghost"
                  className="text-gray-200 hover:bg-gray-700 hover:text-white"
                >
                  About
                </Button>
                <Button
                  variant="ghost"
                  className="text-gray-200 hover:bg-gray-700 hover:text-white"
                >
                  Resources
                </Button>
                <Button
                  variant="ghost"
                  className="text-gray-200 hover:bg-gray-700 hover:text-white gap-2"
                  onClick={onLegislationClick}
                >
                  <FileText className="h-4 w-4" /> Legislation Tracker
                </Button>
                <Button variant="default">Take Action</Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="w-9 h-9 mr-2 cursor-pointer">
                      <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="end">
                    <Command>
                      <CommandList>
                        <CommandGroup>
                          {links.map((link) => (
                            <CommandItem
                              key={link}
                              className="teamaspace-y-1 px-4 py-2"
                            >
                              <p>{link}</p>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="shadow-none lg:hidden hover:bg-transparent"
              >
                <Menu className="h-10 w-10 text-white" />
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>

        <CollapsibleContent className="lg:hidden bg-gray-800 py-4">
          <div>
            <nav className="flex flex-col space-y-2 px-2 md:px-4">
              <TopicDropdown onTopicSelect={onTopicSelect} />
              {navLinks?.map((link) => (
                <button
                  key={link}
                  className="w-full font-medium p-2 text-left text-gray-200 hover:bg-gray-700 hover:text-white"
                  onClick={() => {
                    if (link === "Legislation Tracker") {
                      onLegislationClick();
                    }
                  }}
                >
                  {link}
                </button>
              ))}
            </nav>
            <Separator className="my-2" />

            <div className="px-2 md:px-4 py-2 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="text-white">
                  <h4 className="font-medium">User</h4>
                  <p className="text-sm">user@example.com</p>
                </div>
              </div>
            </div>

            <nav className="mt-2 flex flex-col space-y-2 px-2 md:px-4">
              {links?.map((link) => (
                <button
                  key={link}
                  className="w-full font-medium p-2 text-left text-gray-200 hover:bg-gray-700 hover:text-white"
                >
                  {link}
                </button>
              ))}
            </nav>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default NavigationBar;
