"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Link from "next/link";
import { appPaths } from "@/types/constants";
import {
  createClientComponentClient,
  type Session,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
type Props = {
  session: Session | null;
};

export const NavigationBar = (props: Props) => {
  const { session } = props;
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <Navbar>
      <NavbarContent>
        <NavbarBrand>
          <Link color="foreground" href="/">
            <p className="font-bold text-inherit">ACME</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href={appPaths.products} aria-current="page">
            Products
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {session?.user?.aud === "authenticated" ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar size="md" alt={session.user?.email} />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="gap-2 h-14">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{session.user?.email}</p>
                </DropdownItem>

                <DropdownItem key="profile">Profile</DropdownItem>

                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={handleLogout}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              as={Link}
              color="primary"
              href={appPaths.signIn}
              variant="flat"
            >
              Sign Up
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavigationBar;
