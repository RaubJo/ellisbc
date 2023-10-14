import { Popover } from '@headlessui/react'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { AnimatePresence, motion } from 'framer-motion'

export default function NavPopover() {
  return (
    <div className='fixed top-16 w-full max-w-sm px-4'>
        <Popover>
        {({open}) => (
            <>
            <Popover.Button className={`inline-flex items-center`}>
                Solutions
                <ChevronDownIcon className={`transition ease-in-out duration-150 ${open ? 'rotate-180 transform' : ''}`} />
            </Popover.Button>
            <AnimatePresence>
                {open && 
                <motion.div
                    className=""
                    transition={{ type: "spring", stiffness: 80 }}
                    initial={{ opacity: 0, y: 25, x: 0}}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 0, x: 0}}
                >
                    <Popover.Panel className={`flex flex-col bg-white p-6 mt-4 rounded-md`}>
                        <a href="/insights">Insights</a>
                        <a href="/automations">Automations</a>
                        <a href="/reports">Reports</a>
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