const List = () => {}

const Li = (props: any) => (
    <li
        {...props}
        className="[&>ul]:list-circle [&>ul>li>ul]:list-square 
                    [&>ol]:list-roman [&>ol>li>ol]:list-upper-alpha [&>ol>li>ol>li>ol]:list-roman"
    />
)
const Ol = (props: any) => (
    <ol {...props} className="ml-5 leading-7 md:leading-8 list-decimal" />
)
const Ul = (props: any) => (
    <ul {...props} className="ml-5 leading-7 md:leading-8 list-circle-filled" />
)

List.Li = Li
List.Ol = Ol
List.Ul = Ul

export default List
