import React from 'react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export function PolicyButton() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" className="h-12 w-12 rounded-full shadow-lg">
            <Shield className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <Link to="/privacy-policy" className="w-full">
              Privacy Policy
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/terms-of-service" className="w-full">
              Terms of Service
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/data-deletion" className="w-full">
              Data Deletion
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
} 