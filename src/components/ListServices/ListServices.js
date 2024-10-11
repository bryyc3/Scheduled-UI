import './ListServices.css';

export default function ListServices({service}){
    return(
        <>
            <div className='service'>
                <div className='service_name_description'>
                    <h1 className='service_name'>{service.service}</h1>
                    <h3 className='service_description'>{service.description}</h3>
                    <h3 className='service_description'>{service.time} mins</h3>
                </div>
                <h2 className='service_price'>${service.price}</h2>
            </div>
            <hr />
        </>
    )
}