import { getIntials } from '../../utils/helper.js'

const CharAvatar = ({ fullName, width, height, style }) => {
    return (
        <div className={`${width || 'w-12'} ${height || 'h-12'} ${style || ''} flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-200`}>
            {getIntials(fullName || "")}
        </div>
    )
}

export default CharAvatar