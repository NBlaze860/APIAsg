import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="text-6xl font-bold text-primary-300 mb-4">404</div>
      <h1 className="text-3xl font-semibold mb-4">Page Not Found</h1>
      <p className="text-neutral-600 mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button variant="primary">
          Return Home
        </Button>
      </Link>
    </div>
  )
}

export default NotFoundPage