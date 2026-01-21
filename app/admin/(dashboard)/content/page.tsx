'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Info, 
  Phone, 
  Wrench,
  ExternalLink,
  Edit,
  Eye,
  Layout,
  Image,
  Type,
  Settings
} from 'lucide-react';
import Link from 'next/link';

interface PageSection {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  editUrl: string;
}

interface ContentPage {
  id: string;
  name: string;
  path: string;
  icon: React.ReactNode;
  description: string;
  sections: PageSection[];
}

const contentPages: ContentPage[] = [
  {
    id: 'home',
    name: 'Home Page',
    path: '/',
    icon: <Home className="w-5 h-5" />,
    description: 'Main landing page with hero, products, partners, and CTA sections',
    sections: [
      { id: 'hero', name: 'Hero Section', description: 'Main banner with headline and CTA', icon: <Layout className="w-4 h-4" />, editUrl: '/admin/content/home/hero' },
      { id: 'categories', name: 'Product Categories', description: 'Category cards showcase', icon: <Layout className="w-4 h-4" />, editUrl: '/admin/content/home/categories' },
      { id: 'about', name: 'About Section', description: 'Company introduction', icon: <Type className="w-4 h-4" />, editUrl: '/admin/content/home/about' },
      { id: 'vision-mission', name: 'Vision & Mission', description: 'Company vision and mission statements', icon: <Type className="w-4 h-4" />, editUrl: '/admin/content/home/vision-mission' },
      { id: 'partners', name: 'Partners Section', description: 'Partner logos and info', icon: <Image className="w-4 h-4" />, editUrl: '/admin/content/home/partners' },
      { id: 'cta', name: 'Contact CTA', description: 'Contact form and information', icon: <Phone className="w-4 h-4" />, editUrl: '/admin/content/home/cta' },
    ]
  },
  {
    id: 'about',
    name: 'About Page',
    path: '/about',
    icon: <Info className="w-5 h-5" />,
    description: 'Company information, history, and team',
    sections: [
      { id: 'hero', name: 'About Hero', description: 'Page header with title', icon: <Layout className="w-4 h-4" />, editUrl: '/admin/content/about/hero' },
      { id: 'stats', name: 'Company Stats', description: 'Key numbers and achievements', icon: <Type className="w-4 h-4" />, editUrl: '/admin/content/about/stats' },
      { id: 'story', name: 'Our Story', description: 'Company history and background', icon: <Type className="w-4 h-4" />, editUrl: '/admin/content/about/story' },
      { id: 'values', name: 'Vision, Mission & Values', description: 'Company vision, mission and values', icon: <Type className="w-4 h-4" />, editUrl: '/admin/content/about/values' },
      { id: 'cta', name: 'Call to Action', description: 'Bottom CTA section', icon: <Phone className="w-4 h-4" />, editUrl: '/admin/content/about/cta' },
    ]
  },
  {
    id: 'contact',
    name: 'Contact Page',
    path: '/contact',
    icon: <Phone className="w-5 h-5" />,
    description: 'Contact form, map, and company details',
    sections: [
      { id: 'hero', name: 'Contact Hero', description: 'Page header', icon: <Layout className="w-4 h-4" />, editUrl: '/admin/content/contact/hero' },
      { id: 'info', name: 'Contact Information', description: 'Address, phone, email, hours', icon: <Type className="w-4 h-4" />, editUrl: '/admin/content/contact/info' },
      { id: 'form', name: 'Contact Form', description: 'Form fields and settings', icon: <Settings className="w-4 h-4" />, editUrl: '/admin/content/contact/form' },
      { id: 'map', name: 'Map Section', description: 'Google Maps embed', icon: <Image className="w-4 h-4" />, editUrl: '/admin/content/contact/map' },
      { id: 'cta', name: 'Quick Info Banner', description: 'Call to action banner', icon: <Phone className="w-4 h-4" />, editUrl: '/admin/content/contact/cta' },
    ]
  },
  {
    id: 'services',
    name: 'Services Page',
    path: '/services',
    icon: <Wrench className="w-5 h-5" />,
    description: 'Service offerings and maintenance information',
    sections: [
      { id: 'hero', name: 'Services Hero', description: 'Page header with stats and CTAs', icon: <Layout className="w-4 h-4" />, editUrl: '/admin/content/services/hero' },
      { id: 'partners', name: 'Service Partners', description: 'Brands we service', icon: <Image className="w-4 h-4" />, editUrl: '/admin/content/services/partners' },
      { id: 'offerings', name: 'Service Offerings', description: 'Equipment, maintenance, training, consulting', icon: <Wrench className="w-4 h-4" />, editUrl: '/admin/content/services/offerings' },
      { id: 'why-choose', name: 'Why Choose Us', description: 'Key differentiators and benefits', icon: <Type className="w-4 h-4" />, editUrl: '/admin/content/services/why-choose' },
      { id: 'process', name: 'Service Process', description: 'Step-by-step process flow', icon: <Settings className="w-4 h-4" />, editUrl: '/admin/content/services/process' },
      { id: 'cta', name: 'Call to Action', description: 'Bottom CTA section', icon: <Phone className="w-4 h-4" />, editUrl: '/admin/content/services/cta' },
    ]
  },
];

export default function ContentManagementPage() {
  const [selectedPage, setSelectedPage] = useState<ContentPage | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Content Management</h1>
        <p className="text-muted-foreground mt-1">
          Edit page content like Webflow - click on any section to customize
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Page List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold">Website Pages</h2>
          <div className="space-y-2">
            {contentPages.map((page) => (
              <Card
                key={page.id}
                className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedPage?.id === page.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => setSelectedPage(page)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedPage?.id === page.id 
                      ? 'bg-primary text-white' 
                      : 'bg-muted'
                  }`}>
                    {page.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{page.name}</h3>
                    <p className="text-xs text-muted-foreground">{page.path}</p>
                  </div>
                  <Link href={page.path} target="_blank">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Section Editor */}
        <div className="lg:col-span-2">
          {selectedPage ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    {selectedPage.icon}
                    {selectedPage.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">{selectedPage.description}</p>
                </div>
                <Link href={selectedPage.path} target="_blank">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Page
                  </Button>
                </Link>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Page Sections
                </h3>
                
                {selectedPage.sections.map((section, index) => (
                  <Card 
                    key={section.id}
                    className="p-4 hover:shadow-md transition-all duration-200 hover:border-primary/50 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold/10 to-primary/10 flex items-center justify-center text-primary">
                        {section.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                            {index + 1}
                          </span>
                          <h4 className="font-medium">{section.name}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{section.description}</p>
                      </div>

                      <Link href={section.editUrl}>
                        <Button 
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-gold to-primary"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Section
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Quick Actions */}
              <Card className="p-4 bg-gradient-to-br from-gold/5 to-primary/5 border-gold/20">
                <h3 className="font-medium mb-3">Quick Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <Link href={selectedPage.path} target="_blank">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Live Page
                    </Button>
                  </Link>
                  <Link href={`/admin/content/${selectedPage.id}/settings`}>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Page Settings
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Layout className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Select a Page</h3>
              <p className="text-muted-foreground">
                Click on a page from the list to view and edit its sections
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
