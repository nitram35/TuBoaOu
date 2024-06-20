import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function FooterComponent() {
    return (
        <Footer container className='border border-t-8 border-green-400'>
            <div className=''>
                <div className=''>
                    <Link to='/' className='self-centered whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
                        <span className='px-2 py-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg text-white'>TuBoaOu</span>
                    </Link>
                </div>
                <div className='mt-5'>
                    <div>
                        <Footer.Title title='About Us' />
                        <Footer.LinkGroup col>
                            <Footer.Link
                                href='https://github.com/nitram35/TuBoaOu'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                GitHub Repository
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div className='mt-5'>
                        <Footer.Title title='Contact Us' />
                        <Footer.LinkGroup col>
                            <Footer.Link
                                href='mailto:martin.gandon@utt.fr'
                            >
                                support@tuboaou.com
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                </div>
                <Footer.Divider />
                <div className=''>
                    <Footer.Copyright
                        href='/'
                        text='© TuBoaOu'
                        by='TuBoaOu team'
                        year={new Date().getFullYear()}
                    />
                </div>
            </div>
        </Footer>
    )
}
