const Tables = () => {}

const Table = (props: any) => <table {...props} />
const Td = (props: any) => <td {...props} />
const Tr = (props: any) => <tr {...props} />
const Th = (props: any) => <th {...props} />

Tables.Table = Table
Tables.Td = Td
Tables.Th = Th
Tables.Tr = Tr

export default Tables
