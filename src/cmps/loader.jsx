import { Oval } from 'react-loader-spinner'

export function Loader() {

    return (
        <Oval
            height={100}
            width={100}
            color="#1dbf73"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="white"
            strokeWidth={4}
            strokeWidthSecondary={4}

        />
    )
}