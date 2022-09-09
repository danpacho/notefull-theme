const Table = (props: any) => (
    <table
        {...props}
        className="w-full 
        border border-neutral-300 dark:border-neutral-400 
        text-sm md:text-base text-center"
    />
)
const Tr = (props: any) => (
    <tr
        {...props}
        className="divide-x divide-neutral-300 dark:divide-neutral-400"
    />
)
const Th = (props: any) => (
    <th
        {...props}
        className="bg-neutral-100 dark:bg-neutral-600 border-b border-neutral-300 dark:border-neutral-400 
        font-bold"
    />
)
const Td = (props: any) => <td {...props} className="font-normal" />

Table.Td = Td
Table.Th = Th
Table.Tr = Tr

export default Table
