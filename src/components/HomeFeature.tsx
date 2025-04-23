"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { motion } from "framer-motion"
import { IconStar } from "@tabler/icons-react"
import Link from "next/link"
import { HoverBorderGradientDemo } from "./button"
import { CoverDemo } from "./HomeHero"
import { Footer } from "./Footer"

export function HomePage() {
  const features = [
    {
      title: "Stunning Interior Designs",
      description:
        "Transform your space with our expertly crafted interior designs that blend style and functionality.",
      skeleton: <SkeletonOne />,
      className: "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
    },
    {
      title: "3D Visualization",
      description: "Experience your new interior before it's built with our cutting-edge 3D visualization technology.",
      skeleton: <SkeletonTwo />,
      className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
    },
  ]

  return (
    <div className="relative z-20 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="py-12 lg:py-20">
        <CoverDemo />
        <HoverBorderGradientDemo />
        <p className="text-sm lg:text-base max-w-2xl mt-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
          From concept to creation, we bring your vision to life with our comprehensive interior design services
          tailored to your unique style and needs.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-12 lg:py-20">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 xl:border rounded-md dark:border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-12 lg:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">About Us</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <Image
                src="/team.jpg"
                alt="About Our Interior Design Studio"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <p className="text-lg mb-4">
                With over a decade of experience, our passionate team of interior designers is dedicated to creating
                spaces that inspire and delight. We believe in the power of thoughtful design to transform not just
                homes, but lives.
              </p>
              <p className="text-lg">
                Our approach combines creativity with functionality, ensuring that every project is as unique as our
                clients. From residential to commercial spaces, we bring dreams to life, one design at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 lg:py-20">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <IconStar className="text-yellow-400 w-5 h-5" />
                <IconStar className="text-yellow-400 w-5 h-5" />
                <IconStar className="text-yellow-400 w-5 h-5" />
                <IconStar className="text-yellow-400 w-5 h-5" />
                <IconStar className="text-yellow-400 w-5 h-5" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "The team at Room Decor transformed our space beyond our wildest dreams. Their attention to detail and
                creative solutions made all the difference."
              </p>
              <p className="font-semibold">- Happy Client {i}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 lg:py-20 bg-primary text-white text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Transform Your Space?</h2>
        <p className="text-xl mb-8">Let's bring your vision to life together.</p>
        <Link
          href="/contact"
          className="bg-white text-primary font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300"
        >
          Get Started
        </Link>
      </section>
    </div>
  )
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) => {
  return <div className={cn("p-4 sm:p-8 relative overflow-hidden", className)}>{children}</div>
}

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  )
}

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base max-w-4xl text-left mx-auto",
        "text-neutral-500 text-center font-normal dark:text-neutral-300",
        "text-left max-w-sm mx-0 md:text-sm my-2",
      )}
    >
      {children}
    </p>
  )
}

export const SkeletonOne = () => {
  return (
    <div className="relative flex py-8 px-2 gap-10 h-full">
      <div className="w-full p-5 mx-auto bg-white dark:bg-neutral-900 shadow-2xl group h-full flex">
        <Image
          src="/main.jpg"
          alt="Stunning interior design"
          width={800}
          height={500}
          className="w-full h-full object-cover object-center rounded-sm"
        />
      </div>
    </div>
  )
}

export const SkeletonTwo = () => {
  const designs = ["/one.jpeg", "/two.webp", "/three.jpg", "/four.jpg"]

  const imageVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
  }

  return (
    <div className="relative flex flex-col items-start h-full overflow-hidden">
      <div className="flex flex-row -ml-20">
        {designs.map((design, idx) => (
          <motion.div
            variants={imageVariants}
            key={"designs-first" + idx}
            style={{
              rotate: Math.random() * 20 - 10,
            }}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
          >
            <Image
              src={design || "/placeholder.svg"}
              alt="Interior design concept"
              width={500}
              height={500}
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
            />
          </motion.div>
        ))}
      </div>
      <div className="flex flex-row">
        {designs.map((design, idx) => (
          <motion.div
            key={"designs-second" + idx}
            style={{
              rotate: Math.random() * 20 - 10,
            }}
            variants={imageVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
          >
            <Image
              src={design || "/placeholder.svg"}
              alt="Interior design concept"
              width={500}
              height={500}
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
            />
          </motion.div>
        ))}
      </div>

      <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent h-full pointer-events-none" />
      <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent h-full pointer-events-none" />
  
    </div>
  )
}

