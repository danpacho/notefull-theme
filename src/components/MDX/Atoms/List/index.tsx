const List = () => {}

const Li = (props: any) => <li {...props} className="" />
//!TODO: nesting list-style-type
const Ol = (props: any) => (
    <ol {...props} className="ml-5 leading-7 list-decimal" />
)
const Ul = (props: any) => (
    <ul {...props} className="ml-4 leading-7 list-circle-filled" />
)

List.Li = Li
List.Ol = Ol
List.Ul = Ul

export default List
