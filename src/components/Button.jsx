/* eslint-disable react/prop-types */
export default function Button({ children, ...props }){
    return <button {...props} className="p-1 border border-black rounded-md hover:shadow-sm shadow-md">{children}</button>
}