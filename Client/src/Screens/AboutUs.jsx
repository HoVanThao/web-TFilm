import React from 'react'
import Layout from '../Layout/Layout'
import Head from '../Components/Head'

const AboutUs = () => {
    return (
        <Layout>
            <div className='min-height-screen container mx-auto px-2 my-6'>
                <Head title='About Us' />
                <div className='xl:py-20 py-10 px-4'>
                    <div className='grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center'>
                        <div>
                            <h3 className="text-xl lg:text-3xl mb-4 font-semibold">
                                Welcome to our TFilmHaven
                            </h3>
                            <div className='mt-3 text-sm leading-8 text-text'>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                                    but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
                                    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
                                    of Lorem Ipsum
                                </p>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                                    but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
                                    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
                                    of Lorem Ipsum
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AboutUs