'use client'
import TodoCard from '@/components/todo-card'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { todo } from '../../types/todo'
import { useInView } from 'react-intersection-observer'

export default function Home() {
  const { ref, inView } = useInView()
  const fetchTodos = async ({ pageParam }: { pageParam: number }) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/todos?_page=${pageParam}`
    )
    return res.json()
  }

  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined
      return nextPage
    },
  })

  const content = data?.pages.map((todos: todo[]) =>
    todos.map((todo, index) => {
      if (todos.length == index + 1) {
        return <TodoCard innerRef={ref} key={todo.id} todo={todo} />
      }
      return <TodoCard key={todo.id} todo={todo} />
    })
  )

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log('Fire!')
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  if (status === 'pending') {
    return <p>Loading...</p>
  }

  if (status === 'error') {
    return <p>Error: {error.message}</p>
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      {content} {isFetchingNextPage && <h3>Loading...</h3>}
    </div>
  )
}
