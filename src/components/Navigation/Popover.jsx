import { Popover } from '@headlessui/react'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { AnimatePresence, motion } from 'framer-motion'

export default function NavPopover({children, title, ...props}) {
  return (
    <div className='fixed w-full max-w-sm px-4'>
        <Popover>
        {({ open }) => (
            <>
            <Popover.Button className={`inline-flex items-center`}>
                {title}
                <ChevronDownIcon className={`transition ease-in-out duration-150 ${open ? 'rotate-180 transform' : ''}`} />
            </Popover.Button>
            <AnimatePresence>
                {open && 
                <motion.div
                    className=""
                    initial={{ opacity: 0, y: 25, x: 0}}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 25, x: 0}}
                >
                    <Popover.Panel className={`flex flex-col bg-white p-6 mt-4 rounded-md shadow-xl z-50`}>
                        {children}
                    </Popover.Panel>
                </motion.div>
                }
            </AnimatePresence>
            </>
        )}
        </Popover>
    </div>
  )
}