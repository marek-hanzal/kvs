import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$locale/inventory/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/$locale/inventory/"!</div>
}
