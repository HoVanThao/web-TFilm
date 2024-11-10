import React from 'react'
import MainModal from './MainModal'
import { EmailShareButton, FacebookShareButton, PinterestShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import { FaFacebook, FaPinterest, FaTelegram, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

const ShareMovieModal = ({ modalOpen, setModalOpen, movie }) => {

    const shareData = [
        {
            icon: FaFacebook,
            shareButton: FacebookShareButton,
        },
        {
            icon: FaTwitter,
            shareButton: TwitterShareButton,
        },
        {
            icon: FaTelegram,
            shareButton: TelegramShareButton,
        },
        {
            icon: FaWhatsapp,
            shareButton: WhatsappShareButton,
        },
        {
            icon: FaPinterest,
            shareButton: PinterestShareButton,
        },
        {
            icon: MdEmail,
            shareButton: EmailShareButton,
        }
    ]

    const url = `${window.location.protocol}//${window.location.host}/movie/${movie.name}`;

    return (
        <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <h2 className="text-2xl">Chia sẻ phim <span className="text-xl font-bold">"{movie?.name}"</span></h2>
            <form className="flex-rows flex-wrap gap-6 mt-6">
                {
                    shareData.map((data, index) => (
                        <data.shareButton key={index} url={url} quote="TFilm-Haven | Free Movies Site">
                            <div className='w-12 trainsitions hover:bg-subMain flex-colo text-lg h-12 bg-white rounded bg-opacity-30'>
                                <data.icon />
                            </div>
                        </data.shareButton>
                    ))
                }
            </form>
        </MainModal>
    )
}

export default ShareMovieModal